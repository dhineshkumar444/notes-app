import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import LoginSignUp from './component/login/Login';
import Header from './component/header/Header';
import Breadcrumb from './component/breadcrumb/BreadCrumb';
import NotesList from './component/notes/NotesList';



function App() {
  return (
    <Router>
      <Header />
      <Breadcrumb />
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<NotesList />} /> {/* Home page */}
        <Route path="/login" element={<LoginSignUp />} /> {/* Login/Signup page */}
       
        <Route path="/signup" element={<LoginSignUp />} /> {/* Fallback for undefined routes */}
      </Routes>
    </Router>
  );
}

export default App;
