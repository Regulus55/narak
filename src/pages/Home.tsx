import React, { useEffect, useState } from "react";
import { auth, firestore, storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

type ProductType = {
  이름: string;
  가격: number;
  // 필요한 다른 필드도 추가
};

const Home = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Firestore에서 'product' 컬렉션에서 '상품1' 문서 가져오기
    const fetchProduct = async () => {
      try {
        console.log("Fetching product...");
        const docRef = firestore.collection("product").doc("상품1");
        const doc = await docRef.get();
        console.log("Document data:", doc.data());
        if (doc.exists) {
          setProduct(doc.data() as ProductType);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div>
      <h1>안녕</h1>
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <div>
          <h2>{product.이름}</h2>
          <p>{product.가격}</p>
          {/* 필요한 다른 필드도 여기에 추가 */}
        </div>
      ) : (
        <p>No product found</p>
      )}

      <p>
        <button onClick={() => navigate("/register")}>register</button>
      </p>
      <p>
        <button onClick={() => navigate("/login")}>login</button>
      </p>
      <p>
        <button onClick={() => navigate("/datas")}>datas</button>
      </p>
    </div>
  );
};

export default Home;
