import { deleteAsync } from 'del';

const clean = () => (
  deleteAsync(app.path.clean)
);

export default clean;
