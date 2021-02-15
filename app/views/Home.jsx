import React from 'react';
import { Button, Card, Jumbotron } from 'react-bootstrap';
import Layout from './shared/Layout';


const Home = (props) => {
    const projects = JSON.parse(props.projects);

    return (
        <Layout session = {props.session}>
            <main className="container">
                <Jumbotron>
                    <h2>Welcome to Projects Explorer</h2>
                    <p>
                        Project explorer is a repository for final year projects across all
                        departments of an institution. You can submit your project and search
                        projects submitted by others to learn from
                </p>

                    <Button className="bg-primary mr-2" href="/signup" type="submit" id="submitButton">Sign Up</Button>
                    <Button className="bg-secondary" href="/login">Login</Button>
                </Jumbotron>
                <div className="row showcase">

                    {projects.map((value) => (
                        <Card className="mr-2 col-sm-12 col-md-6 col-lg-3" key={value.id}>
                            <Card.Body>
                                <Card.Link href= {`/projects/${value.id}`} className="text-primary">{value.name}</Card.Link>
                                <Card.Text>{value.authors.join(" ")}</Card.Text>
                                <Card.Text>{value.abstract}</Card.Text>
                                <Card.Link href= {`viewProject.html?id=${value.id}`}>{value.tags.join(" #")}</Card.Link>
                            </Card.Body>

                        </Card>
                    ))}
                </div>
            </main>
        </Layout>
    );

}

export default Home ;