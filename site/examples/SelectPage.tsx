import React from 'react';
import {css} from '@emotion/react';
import {Select, SelectInput, OptionsList} from '@a3/uikit';
import {ExamplePage, Viewarea, PageTitle} from './ExamplePage';

const regionResponse = {
  result: '1',
  region_list: [
    {region_root_id: 8, region_id: 31, region_name: 'Воронежская область'},
    {region_root_id: 8, region_id: 32, region_name: 'Ярославская область'},
    {region_root_id: 2, region_id: 1001, region_name: 'Приморский край'},
    {region_root_id: 2, region_id: 1002, region_name: 'Сахалинская область'},
    {region_root_id: 2, region_id: 1003, region_name: 'Камчатский край'},
    {region_root_id: 2, region_id: 1004, region_name: 'Магаданская область'},
    {region_root_id: 2, region_id: 1005, region_name: 'Амурская область'},
    {region_root_id: 2, region_id: 1006, region_name: 'Хабаровский Край'},
    {region_root_id: 2, region_id: 1007, region_name: 'Саха (Якутия)'},
    {region_root_id: 3, region_id: 1008, region_name: 'Марий Эл'},
    {region_root_id: 3, region_id: 1009, region_name: 'Саратовская область'},
    {region_root_id: 3, region_id: 1010, region_name: 'Мордовия'},
    {region_root_id: 3, region_id: 1011, region_name: 'Ульяновская область'},
    {region_root_id: 3, region_id: 1012, region_name: 'Башкортостан'},
    {region_root_id: 3, region_id: 1013, region_name: 'Чувашская Республика'},
    {region_root_id: 3, region_id: 1014, region_name: 'Самарская область'},
    {region_root_id: 3, region_id: 1015, region_name: 'Кировская область'},
    {region_root_id: 3, region_id: 1016, region_name: 'Татарстан'},
    {region_root_id: 3, region_id: 1017, region_name: 'Нижегородская область'},
    {region_root_id: 3, region_id: 1018, region_name: 'Оренбургская область'},
    {region_root_id: 3, region_id: 1019, region_name: 'Пермский край'},
    {region_root_id: 3, region_id: 1020, region_name: 'Пензенская область'},
    {region_root_id: 4, region_id: 1021, region_name: 'Вологодская область'},
    {region_root_id: 4, region_id: 1022, region_name: 'Карелия'},
    {region_root_id: 4, region_id: 1023, region_name: 'Новгородская область'},
    {region_root_id: 4, region_id: 1024, region_name: 'Псковская область'},
    {region_root_id: 4, region_id: 1025, region_name: 'Коми'},
    {region_root_id: 4, region_id: 1026, region_name: 'Архангельская область'},
    {region_root_id: 4, region_id: 1027, region_name: 'Мурманская область'},
    {region_root_id: 4, region_id: 1028, region_name: 'Калининградская область'},
    {region_root_id: 5, region_id: 1029, region_name: 'Ставропольский край'},
    {region_root_id: 5, region_id: 1030, region_name: 'Карачаево-Черкесская Республика'},
    {region_root_id: 5, region_id: 1031, region_name: 'Дагестан'},
    {region_root_id: 5, region_id: 1032, region_name: 'Кабардино-Балкарская Республика'},
    {region_root_id: 5, region_id: 1033, region_name: 'Ингушетия'},
    {region_root_id: 5, region_id: 1034, region_name: 'Чеченская Республика'},
    {region_root_id: 6, region_id: 1035, region_name: 'Красноярский край'},
    {region_root_id: 6, region_id: 1036, region_name: 'Кемеровская область'},
    {region_root_id: 6, region_id: 1037, region_name: 'Хакасия'},
    {region_root_id: 6, region_id: 1038, region_name: 'Новосибирская область'},
    {region_root_id: 6, region_id: 1039, region_name: 'Забайкальский край'},
    {region_root_id: 6, region_id: 1040, region_name: 'Бурятия'},
    {region_root_id: 6, region_id: 1041, region_name: 'Иркутская область'},
    {region_root_id: 6, region_id: 1042, region_name: 'Алтайский край'},
    {region_root_id: 6, region_id: 1043, region_name: 'Омская область'},
    {region_root_id: 6, region_id: 1044, region_name: 'Томская область'},
    {region_root_id: 6, region_id: 1045, region_name: 'Тыва'},
    {region_root_id: 6, region_id: 1046, region_name: 'Алтай'},
    {region_root_id: 7, region_id: 1047, region_name: 'Свердловская область'},
    {region_root_id: 7, region_id: 1048, region_name: 'Челябинская область'},
    {region_root_id: 7, region_id: 1049, region_name: 'Курганская область'},
    {region_root_id: 7, region_id: 1050, region_name: 'Тюменская область'},
    {region_root_id: 8, region_id: 1051, region_name: 'Ивановская область'},
    {region_root_id: 8, region_id: 1052, region_name: 'Костромская область'},
    {region_root_id: 8, region_id: 1053, region_name: 'Белгородская область'},
    {region_root_id: 8, region_id: 1054, region_name: 'Смоленская область'},
    {region_root_id: 8, region_id: 1055, region_name: 'Тульская область'},
    {region_root_id: 8, region_id: 1056, region_name: 'Липецкая область'},
    {region_root_id: 8, region_id: 1057, region_name: 'Курская область'},
    {region_root_id: 8, region_id: 1058, region_name: 'Тверская область'},
    {region_root_id: 8, region_id: 1059, region_name: 'Владимирская область'},
    {region_root_id: 8, region_id: 1060, region_name: 'Калужская область'},
    {region_root_id: 8, region_id: 1061, region_name: 'Тамбовская область'},
    {region_root_id: 8, region_id: 1062, region_name: 'Рязанская область'},
    {region_root_id: 8, region_id: 1063, region_name: 'Орловская область'},
    {region_root_id: 8, region_id: 1064, region_name: 'Брянская область'},
    {region_root_id: 9, region_id: 1065, region_name: 'Астраханская область'},
    {region_root_id: 9, region_id: 1066, region_name: 'Калмыкия'},
    {region_root_id: 9, region_id: 1067, region_name: 'Краснодарский край'},
    {region_root_id: 9, region_id: 1068, region_name: 'Волгоградская область'},
    {region_root_id: 9, region_id: 1069, region_name: 'Ростовская область'},
    {region_root_id: 9, region_id: 1070, region_name: 'Адыгея'},
    {region_root_id: 2, region_id: 1071, region_name: 'Еврейская АО'},
    {region_root_id: 8, region_id: 1072, region_name: 'Москва'},
    {region_root_id: 4, region_id: 1073, region_name: 'Ненецкий АО'},
    {region_root_id: 5, region_id: 1074, region_name: 'Северная Осетия'},
    {region_root_id: 3, region_id: 1075, region_name: 'Удмуртия'},
    {region_root_id: 4, region_id: 1076, region_name: 'Санкт-Петербург'},
    {region_root_id: 7, region_id: 1077, region_name: 'Ханты-Мансийский АО'},
    {region_root_id: 2, region_id: 1078, region_name: 'Чукотский АО'},
    {region_root_id: 7, region_id: 1079, region_name: 'Ямало-Ненецкий АО'},
    {region_root_id: 6, region_id: 1080, region_name: 'Читинская область'},
    {region_root_id: 8, region_id: 1081, region_name: 'Московская область'},
    {region_root_id: 12, region_id: 1082, region_name: 'Крым'},
    {region_root_id: 12, region_id: 1083, region_name: 'Севастополь'},
    {region_root_id: 4, region_id: 1084, region_name: 'Ленинградская область'},
  ],
};

const optionsList = () => {
  return regionResponse.region_list
    .map(region => ({id: region.region_id, value: region.region_name}))
    .sort((a, b) => (a.value.toLowerCase() > b.value.toLowerCase() ? 1 : -1));
};

export function SelectPage() {
  const [regionId, setRegionId] = React.useState(null);
  const handleSelectRegionId = (id: number) => setRegionId(id);
  return (
    <ExamplePage>
      <PageTitle>Select</PageTitle>
      <Viewarea>
        <Select
          onSelect={handleSelectRegionId}
          value={regionId}
          options={optionsList()}
          styles={css({width: 300, maxWidth: '100%'})}
        >
          <SelectInput />
          <OptionsList />
        </Select>
      </Viewarea>
    </ExamplePage>
  );
}
