import { addLink, addTag } from '../lib/actions';

const Test = () => {
  return (
    <div>
      <form action={addTag}>
        <input type="text" name="name" />
        <input type="text" name="color" />
        <button>Add</button>
      </form>
      <form action={addLink}>
        <input type="text" name="url" />
        <button>Add</button>
      </form>
    </div>
  );
};

export default Test;
