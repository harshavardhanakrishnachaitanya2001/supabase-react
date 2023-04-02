import {useState, useEffect} from 'react'
import {supabase} from './client'
import './App.css';

function App() {
  const [posts, setPosts] = useState([])
  const [post,setPost] = useState({title:'',content : ''})
  const {title,content} = post
  useEffect(() => {fetchPosts()},[])


  async function fetchPosts(){
    const {data} = await supabase.from('posts').select()
    setPosts(data);
    console.log("data: ",data);
  }


  async function createPost(){
    // Check that the title and content fields are not empty
    if (!title || !content) {
      return;
    }
    
    try {
      // Insert the post into the database
      await supabase.from('posts').insert([{title, content}]);
      
      
      // Fetch the updated list of posts
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  }
  

  
  return (
    <div className="App">
      <input type="text" placeholder="Title" value = {title} onChange={e => setPost({...post,title:e.target.value})}/>
      <input type="text" placeholder="Content" value = {content} onChange={e => setPost({...post,content:e.target.value})}/>
      <button onClick = {createPost}>Create post</button>
      {
        posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;
