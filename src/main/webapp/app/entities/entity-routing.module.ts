import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'nb-user',
        data: { pageTitle: 'nbSolarApp.nBUser.home.title' },
        loadChildren: () => import('./nb-user/nb-user.module').then(m => m.NBUserModule),
      },
      {
        path: 'nb-map',
        data: { pageTitle: 'nbSolarApp.nBMap.home.title' },
        loadChildren: () => import('./nb-map/nb-map.module').then(m => m.NBMapModule),
      },
      {
        path: 'nb-map-attributes',
        data: { pageTitle: 'nbSolarApp.nBMapAttributes.home.title' },
        loadChildren: () => import('./nb-map-attributes/nb-map-attributes.module').then(m => m.NBMapAttributesModule),
      },
      {
        path: 'nb-palette',
        data: { pageTitle: 'nbSolarApp.nBPalette.home.title' },
        loadChildren: () => import('./nb-palette/nb-palette.module').then(m => m.NBPaletteModule),
      },
      {
        path: 'nb-chart',
        data: { pageTitle: 'nbSolarApp.nBChart.home.title' },
        loadChildren: () => import('./nb-chart/nb-chart.module').then(m => m.NBChartModule),
      },
      {
        path: 'nb-map-components',
        data: { pageTitle: 'nbSolarApp.nBMapComponents.home.title' },
        loadChildren: () => import('./nb-map-components/nb-map-components.module').then(m => m.NBMapComponentsModule),
      },
      {
        path: 'nb-map-component-attributes',
        data: { pageTitle: 'nbSolarApp.nBMapComponentAttributes.home.title' },
        loadChildren: () =>
          import('./nb-map-component-attributes/nb-map-component-attributes.module').then(m => m.NBMapComponentAttributesModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
