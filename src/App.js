import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {getNewsAction} from "./redux/actions/actionCreator";
import News from "./components/news/news";


function App() {

  const dispatch = useDispatch();

  const [latestNews, popularNews, errors] = useSelector(state => {
   return [state?.news?.latestNews, state?.news?.popularNews, state?.errorReducer];
  });
  console.log(errors);

  const handleNews = () => {
    dispatch(getNewsAction())
  }

  return (
    <div className="App">
      <button onClick={handleNews}>GET NEWS</button>
      <News news={latestNews} title={'Latest News'} error={errors.latestNewsError}/>
      <News news={popularNews} title={'Popular News'} error={errors.popularNewsError}/>
    </div>
  );
}

export default App;
