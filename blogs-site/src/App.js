import './App.css';
import {useState, useEffect} from "react"
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog"
import blogServices from "./services/blogs";
import loginServices from "./services/login";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import RegisterForm from "./components/RegisterForm";
import { Routes, Route} from "react-router-dom";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleAddBlog = e => {
    e.preventDefault();

    const blogObject = {
      title: newTitle,
      author: user.username,
      content: newContent,
      likes: 0,
      user: user._id
    };

    blogServices
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  };

  const handleTitleChange = title => {
    setNewTitle(title);
  };

  const handleContentChange = content => {
    setNewContent(content);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const user = await loginServices.login({
        username, password,
      })

      blogServices.setToken(user.token)
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
    blogServices
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
        <Route path="add-blog" element={<AddBlogForm handleAddBlog={handleAddBlog} newTitle={newTitle} newContent={newContent} handleTitleChange={handleTitleChange} handleContentChange={handleContentChange}/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
