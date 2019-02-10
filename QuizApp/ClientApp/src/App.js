import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Quiz from './components/Quiz';
import ManageHome from './components/ManageHome';
import ManageQuiz from './components/ManageQuiz';
import EditQuestion from './components/EditQuestion';
import Result from './components/Result';
import AddQuiz from './components/AddQuiz';
import Grade from './components/Grade';
import History from './components/History';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/quiz/:categoryId/:levelId' component={Quiz} />
        <Route path='/managehome' component={ManageHome} />
        <Route path='/managequiz/:categoryId' component={ManageQuiz} />
        <Route path='/editquestion/:questionId' component={EditQuestion} />
        <Route path='/result' component={Result} />
        <Route path='/addquiz' component={AddQuiz} />
        <Route path='/grade' component={Grade} />
        <Route path='/history' component={History} />

    </Layout>
);