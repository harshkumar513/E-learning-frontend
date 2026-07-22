import React from "react";
import "./testimonials.css";

const Testimonials = () => {
  const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    position: "Student",
    message:
      "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Student",
    message:
      "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
    image: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: 3,
    name: "John Doe",
    position: "Student",
    message:
      "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
    image: "https://i.pravatar.cc/150?img=33",
  },
  {
    id: 4,
    name: "Jane Smith",
    position: "Student",
    message:
      "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
    image: "https://i.pravatar.cc/150?img=47",
  },
];
  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testmonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="" />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
