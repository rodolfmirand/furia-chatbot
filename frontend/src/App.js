import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import ChatBot from './pages/ChatBot'

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<ChatBot/>}></Route>
            </Routes>
        </Router>
    )
}
export default App;