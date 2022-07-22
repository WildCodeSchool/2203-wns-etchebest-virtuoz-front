import { useMutation } from '@apollo/client';
import { Router } from 'next/router';
import React, { useState } from 'react';
import { createUser } from './_app';
import { useRouter } from 'next/router';

const Registration = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [addUser] = useMutation(createUser);

  return (
    <div className='registrationPage'>
      <div className='form'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addUser({
              variables: { name: name, email: email, password: password },
            });
            setName('');
            setEmail('');
            setPassword('');
            alert('Registered');
            router.push('/login');
          }}
        >
          <p className='title'>Formulaire d&apos;inscription</p>
          <div className='form-inner'>
            <div>
              <input
                type='text'
                name='username'
                id='firstname'
                placeholder='Prénom'
                onChange={(e) => setName(e.target.value)}
                value={name}
                className='RegistrationInput'
              />
            </div>
            <div>
              <input
                type='text'
                name='email'
                id='email'
                placeholder='E-mail'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className='RegistrationInput'
              />
            </div>
            <div>
              <input
                type='password'
                name='Password'
                id='Password'
                placeholder='Mot de passe'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='RegistrationInput'
              />
            </div>
            <div>
              <button
                type='submit'
                value='Continuer'
                className='buttonRegistration'
              >
                Register{' '}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
