import styled from 'styled-components';
import loader from '../../assets/loader.svg'

const Loader = styled.img.attrs({src:loader})`

    /*transform: translateX(-50%) translateY(-50%);*/
    animation: rotation_2 800ms linear both;
    animation-iteration-count: infinite;
    width: 100px;
    height: 100px;

    @keyframes rotation_2 {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(359deg);
        }
    }
`;

export default Loader;
