export function getQueryData(snapshot) {
  if (snapshot.docs) {
    return snapshot.docs.map((doc) => {
      return getDocData(doc);
    });
  } else {
    return getDocData(snapshot);
  }
}

function getDocData(doc) {
  return {
    id: doc.id,
    ...doc.data(),
  };
}
