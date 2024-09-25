import { Link } from 'react-router-dom';

const SliderContent = ({ image, text }) => {
    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: ` url(${image})`,
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-3xl font-bold">{text}</h1>
                    <Link className="btn btn-primary">Get Started</Link>
                </div>
            </div>
        </div>
    );
};

export default SliderContent;