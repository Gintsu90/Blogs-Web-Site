import './App.css';
import {useState, useEffect} from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog"
import personServices from "./services/blogs";
import loginServices from "./services/login";
import LoginForm from "./components/LoginForm";
import AddBlog from "./components/AddBlog";
import RegisterForm from "./components/RegisterForm";
import { Routes, Route} from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const user = await loginServices.login({
        username, password,
      })
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("ERROR!!!!!!");
    }
  }

const handleUsername = username => {
  setUsername(username);
}

const handlePassword = password => {
  setPassword(password);
}
  
  const getBlogs = () => {
    personServices
      .getAll()
      .then(blogs => {
        console.log(blogs);
        setBlogs(blogs);
      });
  };

  useEffect(() => {
    getBlogs();
  }, [])

  return (
    <div className="page-container">
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<BlogList blogs={blogs}/>}/>
        <Route path=":blogId" element={<Blog blogs={blogs}/>}/>
        <Route path="login-form" element={<LoginForm user={user} username={username} password={password} handleLogin={handleLogin} handlePassword={handlePassword} handleUsername={handleUsername}/>}/>
        <Route path="register" element={<RegisterForm />}/>
        <Route path="add-blog" element={<AddBlog />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
