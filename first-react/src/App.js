import './App.css';
import { useState } from 'react';

//MARK: Article
function MyArticle(props) {
  return (
    <article>
      <h2> {props.title} </h2> {props.body}
    </article>
  );
}

//MARK: Header
function MyHeader(props) {
  console.log('props', props.title);
  return (
    <header>
      <h1>
        <a href="/" onClick={event => {
          event.preventDefault(); //원래 기능을 멈춘다 -> <a> 태그
          props.onFirstEvent();
        }}> {props.title} </a>
      </h1>
    </header>
  );
}

//MARK: Navi
function MyNav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a id={t.id} href={'/read/' + t.id} onClick={event => {
          event.preventDefault();
          props.onComponentEvent(Number(event.target.id));
        }}> {t.title}
        </a>
      </li>
    );
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  );
}

//MARK: Create
function Create(props) {
  return (
    <div>
      <article>
        <h2> Create </h2> form handling
      </article>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        alert(title + 'submit' + body);
        props.onCreate(title, body);
      }}>
        <p><input type='text' name='title' placeholder='title....'></input></p>
        <p><textarea name='body' cols='50' rows='8' placeholder='body...'></textarea></p>
        <p><input type='submit' value='create'></input></p>
      </form>
    </div>
  );
}

//MARK: App
function App() {
  const [displayMode, setDisplayMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'javascript', body: 'javascript is...' }
  ];


  let content = null;

  if (displayMode === 'WELCOME') {
    content = <MyArticle title='React' body='React is...'></MyArticle>
  } else if (displayMode === 'READ') {
    let title, body = null;

    for (let i = 0; i < topics.length; i++) {
      if (id === topics[i].id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <MyArticle title={title} body={body}></MyArticle>
  } else if (displayMode === 'CREATE') {
    content = <Create onCreate={(title, body) => {

    }}></Create>
  }

  return (
    <div align='center'>
      <MyHeader data="abc" title="react"
        onFirstEvent={() => {
          setDisplayMode('WELCOME');
        }}>
      </MyHeader>

      <MyNav topics={topics}
        onComponentEvent={id => {
          setDisplayMode('READ');
          setId(id);
        }}>
      </MyNav>

      {content}

      <a href='/create' onClick={event => {
        event.preventDefault();
        setDisplayMode('CREATE');
      }}>CREATE</a>
    </div>
  );
}

export default App;
