import { firestore as db } from "./init-firebase";

const withDisplayMessage = (error, displayMessage) => ({
  ...error,
  message: displayMessage,
});

// convention is: (root collection)_(sub collection 1)_...(sub_collection n)_COLLECTION_ID
const LIST_COLLECTION_ID = "list";
const LIST_ITEMS_COLLECTION_ID = "items";

const checkIfListExists = async (listId) => {
  const doc = await db.collection(LIST_COLLECTION_ID).doc(listId).get();

  return doc.exists;
};

export const createListIfDoesntExistApi = async (listId) => {
  const listExists = await checkIfListExists(listId);

  if (!listExists) {
    await db.collection(LIST_COLLECTION_ID).doc(listId).set({});
  }
};

// should return a function to unsubscribe!
export const subscribeToItemsApi = (func, listId) => {
  return db
    .collection(LIST_COLLECTION_ID)
    .doc(listId)
    .collection(LIST_ITEMS_COLLECTION_ID)
    .onSnapshot((querySnapshot) => {
      func(querySnapshot.docs.map((doc) => doc.data()));
    });
};

export const getAllItemsApi = async (listId) => {
  try {
    const snapshot = await db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .collection(LIST_ITEMS_COLLECTION_ID)
      .get();

    return snapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.log(e);
  }
};

export const addNewItem = async (listId, item) => {
  try {
    await db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .collection(LIST_ITEMS_COLLECTION_ID)
      .add(item);
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to add a new item");
  }
};

export const toggleItemCrossedOut = async (listId, itemId) => {
  const ref = db
    .collection(LIST_COLLECTION_ID)
    .doc(listId)
    .collection(LIST_ITEMS_COLLECTION_ID)
    .doc(itemId);

  const item = ref.get();

  // todo
};

export const deleteAllItemsApi = async (listId) => {
  try {
    const snapshot = await db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .collection(LIST_ITEMS_COLLECTION_ID)
      .get();

    const batch = db.batch();

    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to delete all items");
  }
};
