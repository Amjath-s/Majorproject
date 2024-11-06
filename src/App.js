let currentObjects = [];
let currentAnswer = '';

function App() {
    const [objects, setObjects] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
  
    useEffect(() => {
      const fetchObjects = async () => {
        const querySnapshot = await getDocs(collection(db, 'objects'));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setObjects(data);
      };
  
      fetchObjects();
    }, []);
  
    useEffect(() => {
      if (objects.length > 1) {
        const shuffled = [...objects].sort(() => 0.5 - Math.random());
        setSelectedObjects(shuffled.slice(0, 2));
      }
    }, [objects]);
  
    return (
      <div className="App">
        <h1>Guess the Object!</h1>
        <div>
          {selectedObjects.map((obj, index) => (
            <div key={index} onClick={() => alert(`You selected: ${obj.name}`)}>
              <img src={obj.imageURL} alt={obj.name} width="150" />
              <p>{obj.name}</p>
            </div>
          ))}
        </div>
        <button onClick={() => window.location.reload(false)}>Next</button>
      </div>
    );
  }
export default App;