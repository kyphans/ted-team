import EventTable from '../../components/EventTable';
function Event() {
  return (
    <>
      <div style={{ backgroundColor: 'rgb(54, 77, 121)', textAlign: 'center', padding: '10px', color: 'white' }}>
        <h1>EVENT PAGE</h1>
      </div>


      <div className='flex'>
        <h1>Internal Event</h1>
        <button
          className='ml-auto mr-0 mt-1'
          style={{
            backgroundColor: '',
            color: 'black',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          Add Event
        </button>
      </div>
      <EventTable />

      <hr style={{ margin: '2rem 0', borderTop: '1px solid #000' }} />

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1>School Event</h1>
        <button
          style={{
            marginLeft: 'auto',
            marginRight: '0px',
            marginTop: '1px',
            backgroundColor: '',
            color: 'black',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          }}
        >
          Add Event
        </button>
      </div>
      <EventTable />
    </>
  );
}

export default Event;
