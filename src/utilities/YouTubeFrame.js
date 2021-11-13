import {Col} from "react-bootstrap";

export const YouTubeFrame = ({video, id}) => (
    <Col md={"auto"} className="pt-3">
        <iframe
            width={"100%"}
            height={"100%"}
            src={`https://www.youtube.com/embed/${id}`}
            frameBorder={"0"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video}
        />
    </Col>
)