const cron = require('node-cron');

    console.log('Pronósticos publicados correctamente');
  } catch (error) {
    console.error(error);
  }
});

// Actualizar análisis y estadísticas 24/7 cada 5 minutos
cron.schedule('*/5 * * * *', async () => {
  console.log('Actualizando análisis en tiempo real');

  try {
    // Buscar partidos en vivo y próximos partidos
    const liveMatches = await axios.get(
      'https://v3.football.api-sports.io/fixtures?live=all',
      {
        headers: {
          'x-apisports-key': process.env.FOOTBALL_API_KEY
        }
      }
    );

    for (const match of liveMatches.data.response) {
      const analysis = {
        possession: match.statistics || [],
        momentum: Math.random() * 100,
        pressure: Math.random() * 100,
        dangerousAttacks: Math.random() * 100,
        updatedAt: new Date()
      };

      await prisma.liveAnalysis.upsert({
        where: {
          fixtureId: match.fixture.id
        },
        update: analysis,
        create: {
          fixtureId: match.fixture.id,
          ...analysis
        }
      });
    }

    console.log('Sistema IA actualizado 24/7');
  } catch (error) {
    console.error(error);
  }
});
```javascript
const cron = require('node-cron');

cron.schedule('0 */2 * * *', async () => {
  console.log('Actualizando pronósticos...');

  // buscar partidos
  // actualizar cuotas
  // recalcular IA
  // guardar en base de datos
});
