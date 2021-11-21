import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div
      className="d-flex p-2 justify-content-center align-items-center"
      style={{
        position: 'absolute',
        height: '90%',
        width: '100%',
        marginLeft: '-5%',
        marginRight: '-5%',
        marginTop: '-2%',
      }}
    >
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Login
          </label>
          <input
            type="email"
            className="form-control text-primary"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control text-primary"
            id="exampleInputPassword1"
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: 20, width: '100%' }}
          >
            Sign Up
          </button>
        </div>
        <Link
          to="/login"
          className="btn btn-secondary text-white"
          style={{ width: '100%' }}
        >
          Log In
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
