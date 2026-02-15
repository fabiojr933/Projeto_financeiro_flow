const fs = require('fs');
const path = require('path');
const CategoryRepository = require('../repositories/CategoryRepository');

async function importFromMetadataDespesa(userId, fileName = 'metadataDespesa.json') {
    if (!userId) {
        throw new Error('user_id é obrigatório');
    }

    // 📌 Aponta sempre para a RAIZ do projeto
    const filePath = path.resolve(process.cwd(), fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo de metadata não encontrado: ${fileName}`);
    }

    const metadata = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
    );

    if (!Array.isArray(metadata)) {
        throw new Error('Metadata inválido');
    }

    const categoriesToInsert = [];

    for (const item of metadata) {
        const exists = await CategoryRepository.findByNameAndUser(
            item.name,
            userId
        );

        if (!exists) {
            categoriesToInsert.push({
                user_id: userId,
                name: item.name,
                type: item.type,
                color_code: item.color_code,
                icon: item.icon,
                active: item.active || 'S'
            });
        }
    }

    if (!categoriesToInsert.length) {
        return { inserted: 0 };
    }

    await CategoryRepository.bulkCreate(categoriesToInsert);

    return {
        inserted: categoriesToInsert.length
    };
}

async function importFromMetadataReceita(userId, fileName = 'metadataReceita.json') {
    if (!userId) {
        throw new Error('user_id é obrigatório');
    }

    // 📌 Aponta sempre para a RAIZ do projeto
    const filePath = path.resolve(process.cwd(), fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo de metadata não encontrado: ${fileName}`);
    }

    const metadata = JSON.parse(
        fs.readFileSync(filePath, 'utf8')
    );

    if (!Array.isArray(metadata)) {
        throw new Error('Metadata inválido');
    }

    const categoriesToInsert = [];

    for (const item of metadata) {
        const exists = await CategoryRepository.findByNameAndUser(
            item.name,
            userId
        );

        if (!exists) {
            categoriesToInsert.push({
                user_id: userId,
                name: item.name,
                type: item.type,
                color_code: item.color_code,
                icon: item.icon,
                active: item.active || 'S'
            });
        }
    }

    if (!categoriesToInsert.length) {
        return { inserted: 0 };
    }

    await CategoryRepository.bulkCreate(categoriesToInsert);

    return {
        inserted: categoriesToInsert.length
    };
}

module.exports = {
    importFromMetadataDespesa,
    importFromMetadataReceita
};
