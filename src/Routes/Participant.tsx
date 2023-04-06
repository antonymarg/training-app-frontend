const Participant = ({ logout }: { logout: () => void }) => {
  return (
    <div className="App">
      <div className="container">Participant</div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Participant;
