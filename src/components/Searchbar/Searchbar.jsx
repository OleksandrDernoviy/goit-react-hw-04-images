
import React from 'react';
import { Formik, Field, Form } from 'formik';
import css from './searchbar.module.css';

const Searchbar = ({submit }) => {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, { resetForm }) => {
        submit(values);
        resetForm();
        // console.log('values: ', values);        
      }}
    >
      <Form className={css.searchForm}>
        <Field
          name="query"
          className={css.inputSearch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.searchBtn}>
          <span className={css.searchBtnLabel}>Search</span>
        </button>
      </Form>
    </Formik>
  );
};

export default Searchbar;

// import { ToastContainer, toast } from 'react-toastify';
// import React, { useState } from 'react';
// import css from './searchbar.module.css';

// const Searchbar = ({ submit }) => {
//   const [query, setQuery] = useState('');
//   const [lastQuery, setlastQuery] = useState('');

//   const handleSubmit = event => {
//     event.preventDefault();
//     if (query.trim() === '') {
//       toast('Ви нічого не ввели.');
//       return;
//     }
//     if (query.trim() === lastQuery.trim()) {
//       toast('Ви вже зробили аналогічний запит');
//       return;
//     }

//     submit({ query });
//     setQuery('');
//     setlastQuery(query);
//   };

//   return (
//     <form className={css.searchForm} onSubmit={handleSubmit}>
//       <ToastContainer />
//       <input
//         name="query"
//         className={css.inputSearch}
//         type="text"
//         autoComplete="off"
//         autoFocus
//         placeholder="Search images and photos"
//         value={query}
//         onChange={e => setQuery(e.target.value)}
//       />
//       <button type="submit" className={css.searchBtn}>
//         <span className={css.searchBtnLabel}>Search</span>
//       </button>
//     </form>
//   );
// };

// export default Searchbar;