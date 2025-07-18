import React from 'react';
import './about.css';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'
function About() {


    return (
        <div className="father">


            <section className="section1">
                <div id="container">
                    <div className="creator-card">
                        <img src="me1.jpg" alt="Creator 1" className="creator-image" />
                        <div className="creator-name">Harsh Guleri</div>
                        <div className="creator-role">Founder & Lead Developer</div>
                        <p>
                            Harsh is our coding maestro. He turns concepts into reality, crafting seamless and robust solutions. With a knack for
                            problem-solving, he elevates our projects to new heights.
                        </p>
                    </div>

                    <div className="creator-card">
                        <img src="gurpreet.jpg" alt="Creator 2" className="creator-image" />
                        <div className="creator-name">Gurpreet Singh</div>
                        <div className="creator-role">Lead Designer</div>
                        <p>
                            Gurpreet is the visionary mind behind our designs. With a keen eye for aesthetics and a love for clean, functional designs,
                            he ensures that every project reflects our commitment to excellence.
                        </p>
                    </div>

                    <div className="creator-card">
                        <img src="Hitesh.jpg" alt="Creator 3" className="creator-image" />
                        <div className="creator-name">Hitesh Sharma</div>
                        <div className="creator-role">Content Strategist</div>
                        <p>
                            Chips is the wordsmith of our team. With a passion for storytelling and a deep understanding of audience engagement,
                            he crafts compelling narratives that resonate with our users.
                        </p>
                    </div>


                    <div className="creator-card">
                        <img src="harshit.jpg" alt="Creator 4" className="creator-image" />
                        <div className="creator-name">Harshit Mani Tripathi</div>
                        <div className="creator-role">Marketing Guru</div>
                        <p>
                            Harshit takes our projects to the world. With a strategic approach and a flair for digital marketing, she ensures our
                            creations reach the right audience and leave a lasting impression.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;