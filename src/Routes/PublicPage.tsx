import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { useEffect, useState } from "react";

const PublicPage = () => {
  const [users, setUsers] = useState<Array<any>>();
  const getUsers = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(newData);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="App">
      <div className="container">Public</div>
      <Button>
        <Link to="/login">Login</Link>
      </Button>
      <Button>
        <Link to="/signup">Signup</Link>
      </Button>
      <div>
        {users?.map((e) => (
          <span key={e.uId}>{e.name}</span>
        ))}
      </div>
    </div>
  );
};

export default PublicPage;
