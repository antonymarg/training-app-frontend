const Trainer = ({ logout }: { logout: () => void }) => {
  return (
    <div className="App">
      <div className="container">Trainer</div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Trainer;
