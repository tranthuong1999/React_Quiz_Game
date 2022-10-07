import { BrowserRouter, Route, Switch } from "react-router-dom";
import QuestionTest from "./screens/QuestionTest";
import Home from "./screens/Home";
import ViewTest from "./screens/ViewTest";
import Question from "./screens/Question";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/question-test">
            <QuestionTest />
          </Route>
          <Route path="/question">
            <Question />
          </Route>
          <Route path="/view-answer">
            <ViewTest />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
