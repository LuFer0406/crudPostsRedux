import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost, putPost, delPost} from "./redux/postSlice";

const initialState = {
  id: "",
  img: "",
  title: "",
  description: "",
};

function App() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const [isEdit, setIsEdit] = useState(false);

  const [formulario, setFormulario] = useState(initialState);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !isEdit ? dispatch(addPost(formulario)) : dispatch(putPost(formulario));

    setIsEdit(false);
    cleanForm();
  };

  const clickUpdate = (post) => {
    setIsEdit(true);
    setFormulario(post);
  };

  const cleanForm = () => {
    setFormulario(initialState);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      type="text"
                      name="img"
                      value={formulario.img}
                      className="form-control"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formulario.title}
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={formulario.description}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <button className="btn btn-success">
                  {isEdit ? "Update" : "Save"}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="row col-8">
          {posts.map((post, i) => (
            <div className="col-4" key={i}>
              <div className="card mb-3 flex">
              <img src={post.img} className="card-img-top" alt="Image"/>
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                  <div className="d-flex justify-content-between">
                  <button
                  className="btn btn-danger px-4"
                  onClick={() => dispatch(delPost(post.id))}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary px-4"
                  onClick={() => clickUpdate(post)}
                >
                  Update
                </button>
                  </div>
               
                </div>
                
              </div>
            </div>
            
            
          ))}

          {/* <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">image</th>
                <th scope="col">title</th>
                <th scope="col">description</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{post.id}</td>
                  <td>
                    <img src={post.img} width="100"></img>
                  </td>
                  <td>{post.title}</td>
                  <td>{post.description}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(delPost(post.id))}
                    >
                      del
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => clickUpdate(post)}
                    >
                      put
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}

export default App;
