import React, { Component } from 'react';
import Axios from 'axios';

class Question extends Component {

  //#region Constructor

  constructor(props) {
    super(props);
    this.state = { Question: null };
  }

  //#endregion

  //#region Lifecycle Events

  async componentDidMount() {
    const { match: { params } } = this.props;
    const question = (await Axios.get(`http://localhost:8081/${params.questionId}`)).data;
    this.setState({ question });
  }

  render() {
    const { question } = this.state;
    if (!question) return <p>Loading...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{question.title}</h1>
            <p className="lead">{question.description}</p>
            <hr className="my-4" />
            <p>Answers</p>
            {
              question.answers.map((answer, idx) => (
                <p className="lead" key={idx}>{answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    );
  }

  //#endregion

}
export default Question;