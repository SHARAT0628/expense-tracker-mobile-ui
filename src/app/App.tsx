import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="size-full">
      {/* Mobile container - 360x800px optimized */}
      <div className="min-h-screen max-w-[360px] mx-auto bg-gray-50 shadow-2xl">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}
