import { type NextPage } from "next";

type UnsubscribePageProps = {
  params: Promise<{ email: string }>;
};

const UnsubscribePage: NextPage<UnsubscribePageProps> = async ({ params }) => {
  const { email } = await params;

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Ошибка отписки</h1>
          <p className="text-red-600">Не указан email для отписки.</p>
        </div>
      </div>
    );
  }

  try {
    const response = await fetch(
      `${process.env.API_URL}/subscribers/delete-by-email/${encodeURIComponent(
        email
      )}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );

    if (response.ok) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Отписка успешна</h1>
            <p>Вы успешно отписались от рассылки.</p>
            <p className="mt-4">Email: {decodeURIComponent(email)}</p>
          </div>
        </div>
      );
    } else {
      throw new Error("Failed to unsubscribe");
    }
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Ошибка отписки</h1>
          <p className="text-red-600">
            Произошла ошибка при попытке отписаться. Пожалуйста, попробуйте
            позже.
          </p>
        </div>
      </div>
    );
  }
};

export default UnsubscribePage;
