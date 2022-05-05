import './App.css';
import { Session } from './components/Session/session/session';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Page } from './components/Page/page/page';
import { useSelector } from 'react-redux';
import { Template } from './components/Template/template';

function App() {

  const pageIndex = useSelector((state) => {
    return state.pageIndexReducer.index
  })

  const templateTitle = useSelector((state) => {
    return state.templateTitleReducer.title
  })

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route element={<Session />} path="/"/>
          <Route element={<Page />} path={`/page/${pageIndex}`} />
          <Route element={<Template />} path={`/template/${templateTitle}`} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
