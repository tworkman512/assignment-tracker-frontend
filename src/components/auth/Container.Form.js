import React from "react";

const FormContainer = props => {
  return (
    <main className="container">
      <section className="row justify-content-md-left">
        <div className="col col-lg-5">{props.children}</div>
      </section>
    </main>
  );
};

export default FormContainer;
