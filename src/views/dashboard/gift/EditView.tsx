import { useParams } from 'next/navigation';
import Form from 'sections/dashboard/gift/Form';

const EditView = () => {
  const { id }: { id: string } = useParams();
  return <Form id={id} />;
};

export default EditView;
