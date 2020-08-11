import React from 'react'
import * as ROUTES from '../../constants/routes'
import { Paper, Container } from '@material-ui/core';
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div style ={{height:'100vh'}}>
        <Container className = 'centered'>
            <Paper style = {{width:'100%', padding:'10px'}}>
                <div>
                        <h1 style = {{textAlign:'center'}}>Bienvenue sur Trackenium !</h1>
                        <p>Cette petite application vous permet de : </p>
                        <ul>
                            <li>Partager vos titres préférés avec tous les utilisateurs</li>
                            <li>Ecouter tous les titres ajoutés par les utilisateurs</li>
                            <li>Mettre un "J'aime" sur les musiques que vous préférez</li>
                            <li>Retrouver toutes vos musiques ajoutées et aimées</li>
                            <li>...</li>
                        </ul>
                        <h3><Link to = {ROUTES.SIGN_UP}>Inscrivez-vous</Link> pour démarrer !</h3>
                </div>
            </Paper>

        </Container>
        <p style = {{position:'fixed',width:'100%', bottom:'10px', textAlign:'center'}}>Application réalisée par <a href = "https://yacine.webenium.fr" target = "_blank">Yacine</a></p>
        </div>


    );
}
 
export default Landing;
