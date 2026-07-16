import React, { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { fetchUser } = UserData();
    const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

    useEffect(() => {
        fetchCourse(params.id);
    }, []);

    const checkoutHandler = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const {
                data: { order, key_id },
            } = await axios.post(
                `${server}/api/course/checkout/${params.id}`,
                {},
                {
                    headers: { token },
                }
            );

            const options = {
                key: key_id,
                amount: order.amount,
                currency: order.currency,
                name: "E Learning",
                description: "Learn with us",
                order_id: order.id,

                handler: async function (response) {
                    try {
                        const {
                            razorpay_order_id,
                            razorpay_payment_id,
                            razorpay_signature,
                        } = response;

                        const { data } = await axios.post(
                            `${server}/api/verification/${params.id}`,
                            {
                                razorpay_order_id,
                                razorpay_payment_id,
                                razorpay_signature,
                            },
                            {
                                headers: { token },
                            }
                        );

                        // ✅ Verification successful hote hi turant success dikhao
                        toast.success(data.message);

                        // ✅ Ye alag try-catch mein — inme koi issue aaye
                        // toh upar wala success toast overwrite nahi hoga
                        try {
                            await fetchUser();
                            await fetchCourses();
                            await fetchMyCourse();
                        } catch (err) {
                            console.log("Post-payment refresh error:", err);
                        }

                        navigate(`/payment-success/${razorpay_payment_id}`);
                    } catch (error) {
                        toast.error(
                            error.response?.data?.message ||
                                "Payment verification failed"
                        );
                    } finally {
                        setLoading(false);
                    }
                },

                theme: {
                    color: "#8a4baf",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            setLoading(false);
            toast.error(
                error.response?.data?.message ||
                    "Something went wrong while initiating checkout"
            );
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {course && (
                        <div className="course-description">
                            <div className="course-header">
                                <img
                                    src={`${server}/${course.image}`}
                                    alt=""
                                    className="course-image"
                                />
                                <div className="course-info">
                                    <h2>{course.title}</h2>
                                    <p>Instructor: {course.createdBy}</p>
                                    <p>Duration: {course.duration} weeks</p>
                                </div>
                            </div>
                            <p>{course.description}</p>

                            <p>
                                Let's get started with this course At ₹
                                {course.price}
                            </p>

                            {user &&
                            user.subscription.includes(course._id) ? (
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/course/study/${course._id}`
                                        )
                                    }
                                    className="common-btn"
                                >
                                    Study
                                </button>
                            ) : (
                                <button
                                    onClick={checkoutHandler}
                                    className="common-btn"
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Buy Now"}
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default CourseDescription;