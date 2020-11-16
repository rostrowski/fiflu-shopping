import { firestore as db } from "./init-firebase";
import firebase from "firebase";
import { mergeWithOrder } from "../shared/merge-with-order";

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

export const subscribeToItemsOrderApi = (func, listId) => {
  return db
    .collection(LIST_COLLECTION_ID)
    .doc(listId)
    .onSnapshot((querySnapshot) => {
      func(querySnapshot.data().order);
    });
};

export const getAllItemsApi = async (listId) => {
  try {
    const orderSnapshot = await db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .get();

    const order = orderSnapshot.data().order;

    const itemsSnapshot = await db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .collection(LIST_ITEMS_COLLECTION_ID)
      .get();

    const items = itemsSnapshot.docs.map((doc) => doc.data());

    return mergeWithOrder(items, order);
  } catch (e) {
    console.log(e);
  }
};

export const addNewItemApi = async (listId, item) => {
  try {
    await db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .collection(LIST_ITEMS_COLLECTION_ID)
      .doc(item.id)
      .set(item);
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to add a new item");
  }
};

export const addItemOrderApi = async (listId, itemId) => {
  try {
    const ref = db.collection(LIST_COLLECTION_ID).doc(listId);

    await ref.update({
      order: firebase.firestore.FieldValue.arrayUnion(itemId),
    });
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to add an order for a new item");
  }
};

export const setNewItemOrderApi = async (listId, newOrder) => {
  try {
    await db.collection(LIST_COLLECTION_ID).doc(listId).set({
      order: newOrder,
    });
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to set an order for an item");
  }
};

export const toggleItemCrossedApi = async (listId, itemId) => {
  try {
    const ref = db
      .collection(LIST_COLLECTION_ID)
      .doc(listId)
      .collection(LIST_ITEMS_COLLECTION_ID)
      .doc(itemId);

    const item = (await ref.get()).data();

    await ref.set({ crossedOut: !item.crossedOut }, { merge: true });
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to toggle item crossed");
  }
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

export const deleteOrderApi = async (listId) => {
  try {
    await db.collection(LIST_COLLECTION_ID).doc(listId).set({
      order: [],
    });
  } catch (e) {
    console.log(e);
    throw withDisplayMessage(e, "Failed to delete items order");
  }
};
