import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendEmailVerification
} from "firebase/auth";
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
//Creating Context
const FirebaseContext = createContext();

const firebaseConfig = {
  apiKey:import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

//Initializing instances
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const fireStore = getFirestore(firebaseApp);

//Context custom hook
export const useFirebase = () => useContext(FirebaseContext);

//Handling Signing Up a User
const signingupUser = async (email, password, firstName, lastName) => {
  try {

    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);

    // ✅ Send verification email
    await sendEmailVerification(user);

    // ✅ Create user database record
    await handleCreateNewUser(user.email, user.uid, firstName, lastName);

    alert("Verification email sent. Please verify your Gmail.");

    await signOut(firebaseAuth);

  } catch (error) {
    
    alert(error.code);
  }
};

//Creating dataBase for a User after signing up
const handleCreateNewUser = async (userEmail, userId, userfirstName, userlastName) => {
  const collectionRef = collection(fireStore, "users");
  const res = await addDoc(collectionRef, {
    userEmail,
    userId,
    userfirstName,
    userlastName,
  });
  //  console.log(res);
};

//Handling Logging in a User
const LoginUser = async (email, password) => {
  try{
   const {user} = await signInWithEmailAndPassword(firebaseAuth, email, password);
   if(!user.emailVerified) {
    alert("Verfiy your email before logging in");
    return;
  }
  }catch (error){
    alert(`${error.code}`);
  }  
};

//Handling Signout a User
const signOutUser = () => {
  signOut(firebaseAuth).then((val) => {
  });
};

//Listing all Items
const listAllItems = async () => {
  const collectionRef = collection(fireStore, "items");
  const q = query(collectionRef, where("isSold", "==", false));
  const result = await getDocs(q);
  return result;
};

//Get Item Detail By ID
const getItemById = async (id) => {
  const docRef = doc(fireStore, "items", id);
  const result = await getDoc(docRef);
  return result;
};

//Functional Component starts here

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);
  //Handling User State
  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, async (user) => {
      if (!user) {
      setUser(null);
      return;
    }

    // Refresh verification status
    await user.reload();

    if (user.emailVerified) {
      setUser(user);   // ✅ Only verified users are allowed in
      return;
    }
  });
  }, []);
  const isLoggedIn = user ? true : false;
  // console.log("isLoggedIn", isLoggedIn);
  //handling New Listing
  const handleCreateNewListing = async (title, desc, price, imageURL) => {
    return await addDoc(collection(fireStore, "items"), {
      title,
      desc,
      price,
      imageURL,
      isSold: false,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
    });
  };

  //Fetching Orders by itemID
  const getOrders = async (itemID) => {
    // console.log("Get orders initiated");
    const collectionRef = collection(fireStore, "items", itemID, "orders");
    const result = await getDocs(collectionRef);
    setOrders(result.docs);
  };
  //Checking Constraint on item Purchase
  const checkingConstraint = async (itemID, userID) => {
    const collectionRef = collection(fireStore, "items", itemID, "orders");
    const q = query(collectionRef, where("userID", "==", userID));
    const result = await getDocs(q);
    return result.docs[0];
  };
  //Place Order Function
  const placeOrder = async (itemId) => {
    const collectionRef = collection(fireStore, "items", itemId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      hasSold: "pending",
    });
  };

  //Get User DB ID
  const getUserDBId = async (userID) => {
    const collectionRef = collection(fireStore, "users");
    const q = query(collectionRef, where("userId", "==", userID));
    const result = await getDocs(q);
    const userdbID = result.docs[0].id;
    return userdbID;
  };
  //Handling placed orders
  const handleNewPlacedOrder = async (itemDetails, userID, itemID) => {
    const id = await getUserDBId(userID);
    const collectionRef = collection(fireStore, "users", id, "placed_orders");
    const result = await addDoc(collectionRef, {
      title: itemDetails.title,
      desc: itemDetails.desc,
      imageURL: itemDetails.imageURL,
      price: itemDetails.price,
      status: "pending",
      itemID: itemID,
    });
    // console.log(result);
  };
  //Fetch your placed orders
  const getPlacedOrders = async (userID) => {
    console.log("get Placed Orders func initiated");
    const id = await getUserDBId(userID);
    const collectionRef = collection(fireStore, "users", id, "placed_orders");
    const result = await getDocs(collectionRef);
   return result.docs;
  };

  //Deleting a placed_order by id
  const handledeleteplaced_order = async (itemId, userID) => {
    const userDbId = await getUserDBId(userID);
    const docRef = doc(fireStore, "users", userDbId, "placed_orders", itemId);
    const result = await deleteDoc(docRef);
    // console.log(result);
  };

  //Handling an order Rejection
  const handleOrderRejection = async (itemId, userId) => {
    const userdbID = await getUserDBId(userId);
    const placed_order_item_DBID = await getplaced_orderDBID(itemId, userdbID);
    const docRef = doc(
      fireStore,
      "users",
      userdbID,
      "placed_orders",
      placed_order_item_DBID
    );
    const result = await updateDoc(docRef, {
      status: "false",
    });
  };

  //Deleting an order request after rejection by its id
  const deleteOrderRequest = async (orderId, itemId) => {
    const docRef = doc(fireStore, "items", itemId, "orders", orderId);
    const result = await deleteDoc(docRef);
  };

  //Get placed_order item DB ID
  const getplaced_orderDBID = async (itemId, userdbID) => {
    const collectionRef = collection(
      fireStore,
      "users",
      userdbID,
      "placed_orders"
    );
    const q = query(collectionRef, where("itemID", "==", itemId));
    const result = await getDocs(q);
    const placed_order_item_DBID = result.docs[0].id;
    return placed_order_item_DBID;
  };

  //Updating the hasSold value after order aceeptance
  const handleOrderAccepted = async (orderId, itemId) => {
    const docRef = doc(fireStore, "items", itemId, "orders", orderId);
    const result = updateDoc(docRef, {
      hasSold: "true"
    })
  }

  //Handling an order Acceptance
  const handleOrderAcceptedVal = async (itemId, userId) => {
    const userdbID = await getUserDBId(userId);
    const placed_order_item_DBID = await getplaced_orderDBID(itemId, userdbID);
    const docRef = doc(
      fireStore,
      "users",
      userdbID,
      "placed_orders",
      placed_order_item_DBID
    );
    const result = await updateDoc(docRef, {
      status: "true",
    });
  };

  //Changing the isSold value after order acceptance
  const changeIsSoldVal = async (itemId) =>{
    console.log("Change is solved initated");
    const docRef = doc(fireStore, "items", itemId);
    const result = await updateDoc(docRef,{
      isSold:true
    })
    // console.log(result);
  }
  //Fetch Your Listed items
  const fetchMyListItems = async (userId) => {
    const collectionRef = collection(fireStore, "items");
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);
    return result;
  };

  // console.log(user);

  return (
    <FirebaseContext.Provider
      value={{
        signingupUser,
        LoginUser,
        isLoggedIn,
        signOutUser,
        handleCreateNewListing,
        listAllItems,
        getItemById,
        placeOrder,
        fetchMyListItems,
        user,
        getOrders,
        handleNewPlacedOrder,
        getPlacedOrders,
        handledeleteplaced_order,
        orders,
        checkingConstraint,
        handleOrderRejection,
        deleteOrderRequest,
        handleOrderAccepted,
        handleOrderAcceptedVal,
        changeIsSoldVal
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
