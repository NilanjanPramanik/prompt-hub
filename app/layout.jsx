import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
    title: "Prompt Hub",
    description: 'Discover the best prompts arround the web'
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app relative">
            <div className='w-full fixed top-0 left-0'>
              <Nav />
            </div>
            <div className='mt-20'>  
              {children}
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout