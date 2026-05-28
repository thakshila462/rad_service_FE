import { useEffect } from "react";

const Home = () => {

  const fetchAllItem = async () => {
    try {
      await fetch("http://localhost:5000/api/v1/items");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllItem();
  }, []);

  return <div>Home page components</div>;
};

export default Home;