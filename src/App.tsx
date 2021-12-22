import './App.css';
import { Store } from 'redux';
import { NonoTable } from './components/NonoTable';

function App() {
	return (
		<div className="App">
			<NonoTable c={5} r={5} />
		</div>
	);
}

export default App;
