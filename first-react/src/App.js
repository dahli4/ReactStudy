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
        <form onSubmit={event => {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}>
          <p><input type='text' name='title' placeholder='title....'></input></p>
          <p><textarea name='body' cols='50' rows='8' placeholder='body...'></textarea></p>
          <p><input type='submit' value='create'></input></p>
        </form>
      </article>
    </div>
  );
}

//MARK: Update
function Update(props) {
  const [dispTitle, setDispTitle] = useState(props.orgTitle);
  const [dispBody, setDispBody] = useState(props.orgBody);

  return (
    <article>
      <h2> Update.. </h2>
      <form onSubmit={event => {
        event.preventDefault();
        props.onUpdate(dispTitle, dispBody);
      }}>
        <p><input type='text' name='title' value={dispTitle} onChange={event => {
          setDispTitle(event.target.value);
        }}></input></p>
        <p><textarea name='body' cols='50' rows='8' value={dispBody} onChange={event => {
          setDispBody(event.target.value);
        }}></textarea></p>
        <p><input type='submit' value='update'></input></p>
      </form>
    </article>
  );
}

//MARK: App
function App() {
  const [displayMode, setDisplayMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'javascript', body: 'javascript is...' }
  ]);
  const [nextId, setNextId] = useState(4);


  let content = null;
  let contentController = null;

  let orgTitle, orgBody = null;
  for (let i = 0; i < topics.length; i++) {
    if (id === topics[i].id) {
      orgTitle = topics[i].title;
      orgBody = topics[i].body;
    }
  }

  if (displayMode === 'WELCOME') {
    content = <MyArticle title='React' body='React is...'></MyArticle>
  } else if (displayMode === 'READ') {
    content = <MyArticle title={orgTitle} body={orgBody}></MyArticle>

    contentController = <div>
      <p>
        <a href={'/update/' + id} onClick={event => {
          event.preventDefault();
          setDisplayMode('UPDATE');
        }}> Update </a>
      </p>

      <p>
        <a href={'/delete/' + id} onClick={event => {
          event.preventDefault();
          const newTopics = [];

          for (let i = 0; i < topics.length; i++) {
            if (id !== topics[i].id) {
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setDisplayMode('WELCOME');
        }}> Delete </a>
      </p>
    </div>
  } else if (displayMode === 'CREATE') {
    content = <Create onCreate={(_title, _body) => {
      const newTopics = [...topics];
      const newTopic = { id: nextId, title: _title, body: _body };

      newTopics.push(newTopic);

      setTopics(newTopics);
      setNextId(nextId + 1);
    }}></Create>
  } else if (displayMode === 'UPDATE') {
    content = <Update orgTitle={orgTitle} orgBody={orgBody} onUpdate={(_title, _body) => {
      const newTopic = { id: id, title: _title, body: _body };
      const newTopics = [];

      for (let i = 0; i < topics.length; i++) {
        if (id === topics[i].id) {
          newTopics.push(newTopic);
        } else {
          newTopics.push(topics[i]);
        }
      }
      setTopics(newTopics);
      setDisplayMode('WELCOME');
    }}></Update>
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

      <p><a href='/create' onClick={event => {
        event.preventDefault();
        setDisplayMode('CREATE');
      }}>CREATE</a></p>
      {contentController}
    </div>
  );
}

export default App;
