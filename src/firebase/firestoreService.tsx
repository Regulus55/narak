import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

export const saveUserToDatabase = async (uid: string, displayName: string) => {
  try {
    await setDoc(doc(db, "users", uid), {
      displayName: displayName,
      createdAt: new Date(),
      isAdmin: false,
    });

    console.log("Firestore에 사용자 정보 저장 완료");
  } catch (error) {
    console.error("Firestore에 사용자 정보 저장 실패:", error);
  }
};
