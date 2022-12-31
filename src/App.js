import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react";

function App() {
  const [file_name, set_file_name] = useState("no file");
  const [file_lastModified, set_lastModified] = useState("not yet");
  const [file_size, set_size] = useState(0);
  const [file_type, set_type] = useState("who knows");
  const [file, set_file] = useState({});
  const [file_status, set_file_status] = useState("not chosen");
  const [status_color, set_status_color] = useState("bg-primary text-light")

  return (
    <>
      <div className='text-light position-absolute top-50 start-50' style={{
        transform: "translate(-50%, -50%)"
      }}>
        <h1 className='text-black'>
          you can upload a file from here !
        </h1>
        <form id='form_to_submit' enctype="multipart/form-data" className='bg-primary position-relative rounded p-5' style={{ height: "200px" }} onSubmit={async (event) => {
          event.preventDefault()

          let empty = true;
          for(var i in file){
            empty = false
            break;
          }
          if(empty)
            return;

          set_status_color("bg-warning text-light")
          let formData = new FormData()
          formData.append('uploaded_file', file)
          formData.append('submit_btn', 'Upload')

          await fetch('http://localhost:3001/server.php', {
            method: 'POST',
            body: formData
          }).then(response => response.text())
          .then(data => {
            set_status_color("bg-success text-light")
            set_file_status(data)
          });
        }}>
          <input className='d-block mb-3 mx-auto btn btn-warning' type="file" name="uploaded_file" onChange={(event) => {
            
            set_file_status("waiting for upload")
            set_file(event.target.files[0]);
            set_file_name(event.target.files[0].name);
            set_lastModified(new Date(event.target.files[0].lastModified).toUTCString());
            set_size(event.target.files[0].size);
            set_type(event.target.files[0].type);
          }} />
          <button type="submit" name="submit_btn" className="btn btn-warning d-block mx-auto position-absolute bottom-0 start-50" style={{ transform: "translate(-50%, -50%)" }}>Upload</button>
        </form>
        <div>
          <h2 className='text-black'>
            file info
          </h2>
          <table className="table">
            <thead>
              <tr>
                <th >Property</th>
                <th >Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th >name</th>
                <td>{file_name}</td>
              </tr>
              <tr>
                <th >lastModified</th>
                <td>{file_lastModified}</td>
              </tr>
              <tr>
                <th >size</th>
                <td>{file_size} bytes</td>
              </tr>
              <tr>
                <th >type</th>
                <td>{file_type}</td>
              </tr>
              <tr>
                <th className={status_color}>status</th>
                <td className={status_color}>{file_status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}

export default App;
