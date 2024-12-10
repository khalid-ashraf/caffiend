import { useAuth } from "./state/store";

import CoffeeForm from "./components/CoffeeForm";
import Hero from "./components/Hero";
import Layout from "./components/Layout";
import Stats from "./components/Stats";
import History from "./components/History";

const App = () => {
  const { globalUser, globalData, isLoading } = useAuth();
  const isData = globalData && !!Object.keys(globalData || {}).length;

  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  );

  return (
    <Layout>
      <Hero />
      <CoffeeForm />
      {isLoading && globalUser ? <p>Loading...</p> : null}
      {globalUser && isData ? authenticatedContent : null}
    </Layout>
  );
};
export default App;

