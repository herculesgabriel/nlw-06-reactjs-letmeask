import { useContext } from 'react';
import { useHistory } from 'react-router';

// hooks
import { useAuth } from '../hooks/useAuth';

// components
import { Button } from '../components/Button';

// assets
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

// styles
import '../styles/auth.scss';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    try {
      if (!user) {
        await signInWithGoogle();
      }

      history.push('/rooms/new');
    } catch (error) {
      // TODO tell user something went wrong
      console.error(error);
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real </p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />

          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
