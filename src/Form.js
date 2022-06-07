import React, { useState } from 'react';
import Header from './components/Header';
import './Form.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const getRandomNumber = () => {
  let max = 99;
  let min = 10;
  let step1 = max - min + 1;
  let step2 = Math.random() * step1;
  let result = Math.floor(step2) + min;

  return result;
};

const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    // userfile: '',
    userName: '',
    userAddress: '',
    userDesc: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    const file = e.target.elements.userFile.files[0];

    formData.append('file', file);
    formData.append('userName', user.userName);
    formData.append('userAddress', user.userAddress);
    formData.append('userDesc', user.userDesc);
    formData.append('likes', getRandomNumber());

    const formatAMPM = () => {
      let date = new Date();
      var dd = String(date.getDate()).padStart(2, '0');
      var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = date.getFullYear();

      let today_date = mm + '/' + dd + '/' + yyyy;

      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours %= 12;
      hours = hours || 12;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      const strTime = `${today_date} ${hours}:${minutes} ${ampm}`;
      return strTime;
    };

    let currentDate = formatAMPM();
    formData.append('date', currentDate);

    try {
      console.log(formData);
      const response = await axios.post(
        process.env.REACT_APP_API + '/post/add',
        formData
      );
      setIsLoading(false);
      navigate('/Postview');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header></Header>;
      {isLoading ? (
        <div className='loading'>
          <span>Kindly Wait...Your Image Is Uploading...</span>
        </div>
      ) : (
        ''
      )}
      <div className='form-wrapper'>
        <div className='form'>
          <form action='' onSubmit={handleSubmit}>
            <div className='file'>
              <input
                type='file'
                name='userFile'
                id='userFile'
                accept='.jpg'
                required
              />
            </div>
            <div className='author'>
              <input
                type='text'
                placeholder='Author'
                name='userName'
                id='userName'
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
                required
              />
              <input
                type='text'
                placeholder='Location'
                name='userAddress'
                id='userAddress'
                value={user.userAddress}
                onChange={(e) =>
                  setUser({ ...user, userAddress: e.target.value })
                }
                required
              />
            </div>
            <div className='desc'>
              <input
                type='text'
                placeholder='Desciption'
                name='userDesc'
                id='userDesc'
                value={user.userDesc}
                onChange={(e) => setUser({ ...user, userDesc: e.target.value })}
                required
              />
            </div>
            <div className='post'>
              <button type='submit'>Post</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
