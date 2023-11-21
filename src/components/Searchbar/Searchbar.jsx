import React from 'react';
import { Formik, Field, Form } from 'formik';
import css from './searchbar.module.css';


const Searchbar = ({ submit }) => {
  return (
    <Formik
      initialValues={{ query: '' }}
      onSubmit={(values, { resetForm }) => {
        submit(values);
        resetForm();
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







